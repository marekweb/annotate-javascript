function groupByLines(tokens) {
  let line = [];
  const lines = [];
  let lineNumber = 1;

  for (let t of tokens) {
    if (t.loc.start.line !== t.loc.end.line) {
      throw new Error('Multi-line token');
    }

    if (t.loc.start.line !== lineNumber) {
      if (t.loc.start.line !== lineNumber + 1) {
        throw new Error("A token is skipping a line" + JSON.stringify(t));
      }

      lineNumber++;
      lines.push(line);
      line = [t];
    } else {
      line.push(t);
    }
  }
  return lines;
}

module.exports = groupByLines;
