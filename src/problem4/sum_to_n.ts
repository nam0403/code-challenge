
/**
 * Approach A: Gauss formula
 * Complexity: O(1)
 */
export function sum_to_n_a(n: number): number {
	return (n * (n + 1)) / 2;
}

/**
 * Approach B: generator function
 * Complexity: O(n) time, O(1) memory
 */
function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) yield i;
}

export function sum_to_n_b(n: number): number {
  const m = Math.floor(n);
  if (m <= 0) return 0;
  let sum = 0;
  for (const v of range(1, m)) sum += v;
  return sum;
}


/**
 * Approach C: Iterative loop
 * Complexity: O(n) time, O(1) memory
 */
export function sum_to_n_c(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15