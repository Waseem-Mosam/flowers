// Usage: node scripts/prepare-garden-audio.mjs /absolute/path/to/song.mp3 [start] [end]
// macOS AudioToolbox handles decoding/encoding; PCM processing adds portable fades.
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [input, startArgument = "57", endArgument = "89"] = process.argv.slice(2);
const start = Number(startArgument);
const end = Number(endArgument);
if (!input || !Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
    throw new Error("Provide an audio file and a valid start/end time in seconds.");
}

const scratch = mkdtempSync(join(tmpdir(), "garden-audio-"));
const decodedPath = join(scratch, "decoded.wav");
execFileSync("afconvert", ["-f", "WAVE", "-d", "LEI16", resolve(input), decodedPath]);
const original = readFileSync(decodedPath);
if (original.toString("ascii", 0, 4) !== "RIFF" || original.toString("ascii", 8, 12) !== "WAVE") {
    throw new Error("Expected decoded PCM WAV audio.");
}

let format;
let samples;
for (let offset = 12; offset + 8 <= original.length;) {
    const name = original.toString("ascii", offset, offset + 4);
    const size = original.readUInt32LE(offset + 4);
    if (name === "fmt ") format = original.subarray(offset + 8, offset + 8 + size);
    if (name === "data") samples = original.subarray(offset + 8, offset + 8 + size);
    offset += 8 + size + (size % 2);
}
if (!format || !samples || format.readUInt16LE(0) !== 1 || format.readUInt16LE(14) !== 16) {
    throw new Error("Expected 16-bit integer PCM audio.");
}

const channels = format.readUInt16LE(2);
const sampleRate = format.readUInt32LE(4);
const blockAlign = channels * 2;
const firstFrame = Math.round(start * sampleRate);
const frames = Math.round((end - start) * sampleRate);
if ((firstFrame + frames) * blockAlign > samples.length) {
    throw new Error("The selected excerpt extends past the source audio.");
}

const output = Buffer.alloc(44 + frames * blockAlign);
output.write("RIFF", 0);
output.writeUInt32LE(output.length - 8, 4);
output.write("WAVEfmt ", 8);
output.writeUInt32LE(16, 16);
output.writeUInt16LE(1, 20);
output.writeUInt16LE(channels, 22);
output.writeUInt32LE(sampleRate, 24);
output.writeUInt32LE(sampleRate * blockAlign, 28);
output.writeUInt16LE(blockAlign, 32);
output.writeUInt16LE(16, 34);
output.write("data", 36);
output.writeUInt32LE(frames * blockAlign, 40);

for (let frame = 0; frame < frames; frame++) {
    const fadeIn = Math.min(1, frame / (sampleRate * 1.2));
    const fadeOut = Math.min(1, (frames - 1 - frame) / (sampleRate * 3.5));
    const gain = 0.6 * Math.sin(Math.min(fadeIn, fadeOut) * Math.PI / 2) ** 2;
    for (let channel = 0; channel < channels; channel++) {
        const sourceOffset = (firstFrame + frame) * blockAlign + channel * 2;
        const destinationOffset = 44 + frame * blockAlign + channel * 2;
        output.writeInt16LE(Math.round(samples.readInt16LE(sourceOffset) * gain), destinationOffset);
    }
}

const excerptPath = join(scratch, "chorus.wav");
writeFileSync(excerptPath, output);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetDirectory = join(projectRoot, "public", "audio");
mkdirSync(assetDirectory, { recursive: true });
const assetPath = join(assetDirectory, "i-guess-im-in-love-chorus.m4a");
execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "192000", excerptPath, assetPath]);
rmSync(scratch, { recursive: true, force: true });
console.log(JSON.stringify({ asset: assetPath, start, end, duration: end - start, fadeIn: 1.2, fadeOut: 3.5 }));
