const txt = await Bun.file(`${__dirname}/hanzi-freq.txt`).text();
const lines = txt.matchAll(/^\d.+$/gm);

const acc = {};
for (const line of lines) {
  const [, char, freq, cumFreq, pinyin, english] = line[0].split('\t', 6);

  acc[char!] = {
    freq: parseFloat(freq!),
    cumFreq: parseFloat(cumFreq!),
    pinyin,
    english,
  };
}

await Bun.write('hanzi.json', JSON.stringify(acc));
