function convertToSingleLineString(code) {
    return code.replace(/\n/g, '\\n');
}

console.log(convertToSingleLineString(`
int player(vector<int> player_prev_moves, vector<int> opponent_prev_moves) {
  double prob = getRandomNumber(0.0, 1.0);
    if (prob <= 0.33)
        return 1;
    return 0;
}

`))