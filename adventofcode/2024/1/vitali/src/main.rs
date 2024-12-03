use itertools::Itertools;

fn main() -> anyhow::Result<()> {
    let (a, b) = parse(&std::fs::read_to_string("input.txt")?);

    println!("Part #1: {}", part1(&a, &b));
    println!("Part #2: {}", part2(&a, &b));

    Ok(())
}

fn parse(input: &str) -> (Vec<u32>, Vec<u32>) {
    input
        .lines()
        .filter_map(|l| l.split_once("   "))
        .filter_map(|(a, b)| a.parse::<u32>().ok().zip(b.parse::<u32>().ok()))
        .unzip()
}

fn part1(left: &[u32], right: &[u32]) -> u32 {
    left.iter()
        .sorted()
        .zip(right.iter().sorted())
        .fold(0, |sum, (lft, rgt)| sum + lft.abs_diff(*rgt))
}

fn part2(left: &[u32], right: &[u32]) -> u32 {
    let counts = right.iter().counts();
    left.iter().fold(0, |sum, num| {
        sum + *counts.get(num).unwrap_or(&0) as u32 * num
    })
}

#[cfg(test)]
mod tests {
    use crate::{parse, part1, part2};

    const INPUT: &str = r#"3   4
4   3
2   5
1   3
3   9
3   3"#;

    #[test]
    fn test_part1() {
        let (a, b) = parse(INPUT);
        assert_eq!(part1(&a, &b), 11);
    }

    #[test]
    fn test_part2() {
        let (a, b) = parse(INPUT);
        assert_eq!(part2(&a, &b), 31);
    }
}
