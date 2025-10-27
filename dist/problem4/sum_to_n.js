"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum_to_n_a = sum_to_n_a;
exports.sum_to_n_b = sum_to_n_b;
exports.sum_to_n_c = sum_to_n_c;
/**
 * Approach A: Gauss formula
 * Complexity: O(1)
 */
function sum_to_n_a(n) {
    return (n * (n + 1)) / 2;
}
/**
 * Approach B: generator function
 * Complexity: O(n) time, O(1) memory
 */
function* range(start, end) {
    for (let i = start; i <= end; i++)
        yield i;
}
function sum_to_n_b(n) {
    const m = Math.floor(n);
    if (m <= 0)
        return 0;
    let sum = 0;
    for (const v of range(1, m))
        sum += v;
    return sum;
}
/**
 * Approach C: Iterative loop
 * Complexity: O(n) time, O(1) memory
 */
function sum_to_n_c(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15
