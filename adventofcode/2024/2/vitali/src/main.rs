use itertools::Itertools;

fn is_safe(nums: &[i32], skip: Option<usize>) -> bool {
    let skip = skip.unwrap_or(nums.len());

    nums.iter()
        .enumerate()
        .filter(|&(i, _)| i != skip)
        .tuple_windows()
        .map(|(a, b)| a.1 - b.1)
        .try_fold(0, |curr, x| match (x.abs(), x.signum()) {
            (1..=3, sign) if curr == sign || curr == 0 => Ok(sign),
            _ => Err(()),
        })
        .map_or(false, |x| x != 0)
}

fn parse(input: &str) -> Vec<Vec<i32>> {
    input
        .lines()
        .map(|l| {
            l.split_whitespace()
                .filter_map(|n| n.parse().ok())
                .collect()
        })
        .collect()
}

fn part1(reports: &[Vec<i32>]) -> usize {
    reports.iter().filter(|r| is_safe(r, None)).count()
}

fn part2(reports: &[Vec<i32>]) -> usize {
    reports
        .iter()
        .filter(|r| (0..r.len()).any(|i| is_safe(r, Some(i))))
        .count()
}

fn main() -> anyhow::Result<()> {
    let reports = parse(&std::fs::read_to_string("input.txt")?);

    println!("Part #1: {}", part1(&reports));
    println!("Part #2: {}", part2(&reports));

    Ok(())
}

#[cfg(test)]
mod tests {
    use crate::{parse, part1, part2};

    const INPUT: &str = r#"7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9"#;

    #[test]
    fn test_part1() {
        let reports = parse(INPUT);
        assert_eq!(part1(&reports), 2);
    }

    #[test]
    fn test_part2() {
        let reports = parse(INPUT);
        assert_eq!(part2(&reports), 4);
    }
}
