function splitMultiLineToken(token) {
  if (typeof token.value === "undefined") {
    throw new Error("Token has no value field" + token);
  }
  const parts = token.value.split("\n");
  const newFirstToken = {
    ...token,
    value: parts[0],
    loc: {
      start: { ...token.loc.start },
      end: {
        line: token.loc.start.line,
        pos: token.loc.start.column + parts[0].length,
      },
    },
  };
  const remainingParts = parts.slice(1).map((p, i) => {
    return {
      ...token,
      value: p,
      loc: {
        start: {
          line: token.loc.start.line + i + 1,
          column: 0,
        },
        end: {
          line: token.loc.start.line + i + 1,
          column: p.length,
        },
      },
    };
  });
  const output = [newFirstToken, ...remainingParts];
  return output;
}

function splitMultiLineTokens(tokens) {
  const output = [];
  tokens.forEach((t) => {
    if (isMultilineToken(t)) {
      const splitTokens = splitMultiLineToken(t);
      output.push(...splitTokens);
    } else {
      output.push(t);
    }
  });
  return output;
}

function isMultilineToken(token) {
  return token.loc.start.line !== token.loc.end.line;
}

module.exports = splitMultiLineTokens;
