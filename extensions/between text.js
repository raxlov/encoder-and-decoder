class BetweenChecker {
  getInfo() {
    return {
      id: 'betweenChecker',
      name: 'Between Checker',
      blocks: [
        {
          opcode: 'checkBetween',
          blockType: Scratch.BlockType.REPORTER,
          text: 'whats between the [num]nd [str1], [str2] in [text]',
          arguments: {
            num: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            },
            str1: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '-{}-'
            },
            str2: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '-{}-'
            },
            text: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '-{}-hello-{}--{}-world-{}-'
            }
          }
        },
        {
          opcode: 'countBetween',
          blockType: Scratch.BlockType.REPORTER,
          text: 'how many [str1], [str2] in [text]',
          arguments: {
            str1: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '-{}-'
            },
            str2: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '-{}-'
            },
            text: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '-{}-hello-{}--{}-world-{}-'
            }
          }
        }
      ]
    };
  }

  checkBetween({ num, str1, str2, text }) {
    num = parseInt(num);

    // Validation for num
    if (isNaN(num) || num < 1 || num.toString().includes('.')) {
      return 'Error';
    }

    // Increment num if it isn't 1
    if (num !== 1) {
      num++;
    }

    // Handle case where str1 and str2 are identical
    let sameDelimiters = (str1 === str2);
    let occurrence = 0;
    let startPos = -1;
    let depth = 0;
    let toggle = false;

    for (let i = 0; i < text.length; i++) {
      // Check for str1 or str2
      if (text.startsWith(str1, i)) {
        if (sameDelimiters) {
          toggle = !toggle;
          if (toggle) {
            depth++;
            if (depth === 1) {
              occurrence++;
              if (occurrence === num) {
                startPos = i;
              }
            }
          } else {
            depth--;
            if (depth === 0 && startPos !== -1) {
              return text.slice(startPos + str1.length, i);
            }
          }
        } else {
          depth++;
          if (depth === 1) {
            occurrence++;
            if (occurrence === num) {
              startPos = i;
            }
          }
        }
        i += str1.length - 1;
        continue;
      }

      if (text.startsWith(str2, i)) {
        depth--;
        if (depth === 0 && startPos !== -1) {
          return text.slice(startPos + str1.length, i);
        }
        i += str2.length - 1;
      }
    }

    return 'Error';
  }

  countBetween({ str1, str2, text }) {
    let depth = 0;
    let count = 0;
    let sameDelimiters = (str1 === str2);
    let toggle = false;

    for (let i = 0; i < text.length; i++) {
      if (text.startsWith(str1, i)) {
        if (sameDelimiters) {
          toggle = !toggle;
          if (toggle) {
            depth++;
            if (depth === 1) {
              count++;
            }
          } else {
            depth--;
          }
        } else {
          depth++;
          if (depth === 1) {
            count++;
          }
        }
        i += str1.length - 1;
        continue;
      }

      if (text.startsWith(str2, i)) {
        depth--;
        i += str2.length - 1;
      }
    }

    if (depth !== 0) return 'Error';

    return count;
  }
}

Scratch.extensions.register(new BetweenChecker());
