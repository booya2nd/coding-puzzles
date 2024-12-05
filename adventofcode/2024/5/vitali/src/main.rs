use anyhow::Result;
use petgraph::algo::toposort;
use petgraph::graph::DiGraph;
use std::collections::{HashMap, HashSet};

fn parse(input: &str) -> (Vec<(i32, i32)>, Vec<Vec<i32>>) {
    let (first, second) = input.split_once("\n\n").unwrap();
    let rules = first
        .lines()
        .map(|line| {
            let (n1, n2) = line.split_once("|").unwrap();
            (n1.parse().unwrap(), n2.parse().unwrap())
        })
        .collect::<Vec<_>>();

    let second = second
        .lines()
        .map(|l| l.split(',').map(|n| n.parse().unwrap()).collect())
        .collect();

    (rules, second)
}

fn is_valid(nums: &[i32], rules: &[(i32, i32)]) -> bool {
    let indexes: HashMap<_, _> = nums.iter().enumerate().map(|(idx, v)| (v, idx)).collect();

    rules.iter().all(|&(n1, n2)| {
        indexes
            .get(&n1)
            .zip(indexes.get(&n2))
            .map_or(true, |(&idx1, &idx2)| idx1 < idx2)
    })
}

fn part1(data: &(Vec<(i32, i32)>, Vec<Vec<i32>>)) -> i32 {
    let (rules, nums) = data;

    nums.iter()
        .filter(|&n| is_valid(n, rules))
        .map(|n| n[n.len() / 2])
        .sum()
}

fn fix(nums: &[i32], rules: &[(i32, i32)]) -> Vec<i32> {
    let set: HashSet<_> = nums.iter().cloned().collect();
    let mut nodes = HashMap::new();

    let graph = rules
        .iter()
        .filter(|(a, b)| set.contains(a) && set.contains(b))
        .fold(DiGraph::new(), |mut graph, &(a, b)| {
            let node_a = *nodes.entry(a).or_insert_with(|| graph.add_node(a));
            let node_b = *nodes.entry(b).or_insert_with(|| graph.add_node(b));
            graph.add_edge(node_a, node_b, ());
            graph
        });

    toposort(&graph, None)
        .unwrap()
        .iter()
        .map(|n| *graph.node_weight(*n).unwrap())
        .collect::<Vec<_>>()
}

fn part2(data: &(Vec<(i32, i32)>, Vec<Vec<i32>>)) -> i32 {
    let (rules, nums) = data;

    nums.iter()
        .filter(|n| !is_valid(n, rules))
        .map(|n| fix(n, rules)[n.len() / 2])
        .sum()
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
