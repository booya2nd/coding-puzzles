use std::collections::{HashMap, HashSet};
use anyhow::Result;

fn parse(input: &str) -> (Vec<(i32, i32)>, Vec<Vec<i32>>) {
    let (first, second) = input.split_once("\n\n").unwrap();
    let rules = first.lines().map(|line| {
        let (n1, n2) = line.split_once("|").unwrap();
        (n1.parse().unwrap(), n2.parse().unwrap())
    }).collect::<Vec<_>>();

    let second = second.lines().map(|l| l.split(',').map(|n| n.parse().unwrap()).collect()).collect();

    (rules, second)
}

fn is_valid(nums: &[i32], rules: &HashSet<&(i32, i32)>) -> bool {
    let indexes: HashMap<_, _> = nums.iter().enumerate().map(|(idx, v)| (v, idx)).collect();

    rules.iter().all(|&(n1, n2)| {
        indexes.get(&n1).zip(indexes.get(&n2)).map_or(true, |(&idx1, &idx2)| idx1 < idx2)
    })
}

fn part1(data: &(Vec<(i32, i32)>, Vec<Vec<i32>>)) -> i32 {
    let (rules, nums) = data;
    let rules: HashSet<&(i32, i32)> = HashSet::from_iter(rules.iter());

    let mut sum = 0;
    for n in nums {
        if is_valid(n, &rules) {
            sum += n[n.len() / 2];
        }

    }

    sum
}

fn fix(nums: &[i32], rules: &HashSet<&(i32, i32)>) -> Vec<i32> {
    let mut fixed = nums.to_vec();


    for i in 0..nums.len()-1 {
        for j in i+1..nums.len() {
            if rules.contains(&(nums[j], nums[i])) {
                fixed.swap(i, j);
            }
        }
    }

    fixed
}


fn part2(data: &(Vec<(i32, i32)>, Vec<Vec<i32>>)) -> i32 {
    let (rules, nums) = data;
    let rules: HashSet<&(i32, i32)> = HashSet::from_iter(rules.iter());

    let mut sum = 0;
    for n in nums {
        if !is_valid(n, &rules) {
            let mut n = n.clone();
            while !is_valid(&n, &rules) {
                n = fix(&n, &rules);
            }

            sum += n[n.len() / 2];
        }

    }

    sum
}

fn main() -> Result<()> {
    let data = parse(&std::fs::read_to_string("input.txt")?);

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    const INPUT: &str = r#"47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47"#;


    #[test]
    fn test_part1() {
        assert_eq!(super::part1(&parse(INPUT)), 143);
    }

    #[test]
    fn test_part2() {
        assert_eq!(super::part2(&parse(INPUT)), 123);
    }
}
