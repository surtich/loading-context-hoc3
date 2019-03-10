const compose = (...fs) => x => fs.reduceRight((y, fs) => fs(y), x);
