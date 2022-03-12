function choice(items) {
    let idx = Math.floor(Math.random() * items.length);
    return items[idx];
}

function remove(items, item) {
    let result = [];
    for (i = 0; i < items.length; i++) {
      if (items[i] !== item ) {
        result.push(items[i])
      }
    }
    return result;
  }

export { choice, remove }
