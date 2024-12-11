use std::collections::HashMap;

fn main() {
    let data = std::fs::read_to_string("input.txt").unwrap();

    println!("Part #1: {}", part1(&parse(&data)));
    println!("Part #2: {}", part2(&parse(&data)));
}

fn parse(input: &str) -> Vec<u64> {
    input
        .split_ascii_whitespace()
        .map(|l| l.parse().unwrap())
        .collect()
}

fn part1(stones: &[u64]) -> usize {
    solve(stones, 25)
}

fn part2(stones: &[u64]) -> usize {
    solve(stones, 75)
}

fn solve(stones: &[u64], times: usize) -> usize {
    let mut stones = stones
        .iter()
        .map(|stone| (*stone, 1))
        .collect::<HashMap<_, _>>();

    for _ in 0..times {
        stones = blink(&stones);
    }

    stones.values().sum()
}
fn blink(stones: &HashMap<u64, usize>) -> HashMap<u64, usize> {
    let mut result = HashMap::new();

    for (&stone, &cnt) in stones {
        if stone == 0 {
            *result.entry(1).or_default() += cnt;
            continue;
        }

        let s = stone.to_string();
        if s.len() % 2 == 0 {
            let (left, right) = s.split_at(s.len() / 2);

            *result.entry(left.parse().unwrap()).or_default() += cnt;
            *result.entry(right.parse().unwrap()).or_default() += cnt;
        } else {
            *result.entry(stone * 2024).or_default() += cnt;
        }
    }

    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn part1_example() {
        assert_eq!(part1(&parse("125 17")), 55312);
    }
}
