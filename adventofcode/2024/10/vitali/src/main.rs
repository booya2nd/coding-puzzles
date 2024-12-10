use grid::Grid;
use std::collections::{HashSet, VecDeque};

fn main() {
    let data = std::fs::read_to_string("input.txt").unwrap();

    println!("Part #1: {}", part1(&parse(&data)));
    println!("Part #2: {}", part2(&parse(&data)));
}

fn parse(input: &str) -> Grid<u8> {
    let cols = input.trim().find('\n').unwrap_or_default();
    let inner = input
        .chars()
        .filter(|c| *c != '\n')
        .map(|c| {
            if c.is_ascii_digit() {
                c as u8 - b'0'
            } else {
                255
            }
        })
        .collect::<Vec<_>>();

    Grid::from_vec(inner, cols)
}

fn part1(grid: &Grid<u8>) -> usize {
    grid.indexed_iter()
        .filter(|&(_, value)| *value == 0)
        .map(|(pos, _)| find_all_paths(grid, pos, true))
        .sum()
}

fn part2(grid: &Grid<u8>) -> usize {
    grid.indexed_iter()
        .filter(|&(_, value)| *value == 0)
        .map(|(pos, _)| find_all_paths(grid, pos, false))
        .sum()
}

fn find_all_paths(grid: &Grid<u8>, start: (usize, usize), not_distinct: bool) -> usize {
    let mut queue = VecDeque::new();

    queue.push_back(vec![start]);
    let mut visited = HashSet::new();
    visited.insert(start);

    let mut count = 0;

    while let Some(path) = queue.pop_front() {
        let last = *path.last().unwrap();
        let current = *grid.get(last.0, last.1).unwrap();

        for direction in [(0, 1), (1, 0), (-1, 0), (0, -1)] {
            let (nr, nc) = (last.0 as isize + direction.0, last.1 as isize + direction.1);
            let cell = grid.get(nr, nc);

            if matches!(cell, Some(&value) if value == current + 1) {
                if not_distinct && !visited.insert((nr as usize, nc as usize)) {
                    continue;
                }

                let mut new_path = path.clone();
                new_path.push((nr as usize, nc as usize));

                if *cell.unwrap() < 9 {
                    queue.push_back(new_path);
                } else {
                    count += 1;
                }
            }
        }
    }

    count
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn part1_example() {
        assert_eq!(
            part1(&parse(
                "0123
1234
8765
9876"
            )),
            1
        );

        assert_eq!(
            part1(&parse(
                "89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732"
            )),
            36
        );
    }

    #[test]
    fn part2_example() {
        assert_eq!(
            part2(&parse(
                "89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732"
            )),
            81
        );
    }
}
