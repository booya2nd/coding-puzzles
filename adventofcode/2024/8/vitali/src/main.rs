use grid::Grid;
use itertools::Itertools;
use std::collections::{HashMap, HashSet};

fn main() -> anyhow::Result<()> {
    let data = std::fs::read_to_string("input.txt")?;

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

fn parse(input: &str) -> Grid<char> {
    let cols = input.trim().find('\n').unwrap_or_default();
    let inner = input.chars().filter(|c| *c != '\n').collect::<Vec<_>>();

    Grid::from_vec(inner, cols)
}

fn part1(input: &str) -> usize {
    let grid = parse(input);

    let mut antennas = HashMap::new();

    for (p, c) in grid.indexed_iter().filter(|(_, c)| c.is_alphanumeric()) {
        antennas.entry(c).or_insert_with(Vec::new).push(p);
    }

    let mut set = HashSet::new();

    for coords in antennas.values() {
        for pair in coords.iter().permutations(2) {
            let x1 = pair[0].0 as i32;
            let y1 = pair[0].1 as i32;
            let x2 = pair[1].0 as i32;
            let y2 = pair[1].1 as i32;

            let (dx, dy) = (x2 - x1, y2 - y1);
            let (ax1, ay1) = (x1 - dx, y1 - dy);
            let (ax2, ay2) = (x2 + dx, y2 + dy);

            if ax1 >= 0 && ay1 >= 0 && ax1 < grid.cols() as i32 && ay1 < grid.rows() as i32 {
                set.insert((ax1, ay1));
            }

            if ax2 >= 0 && ay2 >= 0 && ax2 < grid.cols() as i32 && ay2 < grid.rows() as i32 {
                set.insert((ax2, ay2));
            }
        }
    }

    set.len()
}

fn part2(input: &str) -> usize {
    let grid = parse(input);

    let mut antennas = HashMap::new();

    for (p, c) in grid.indexed_iter().filter(|(_, c)| c.is_alphanumeric()) {
        antennas.entry(c).or_insert_with(Vec::new).push(p);
    }

    let mut set = HashSet::new();

    for coords in antennas.values() {
        for pair in coords.iter().permutations(2) {
            let (x1, y1) = (pair[0].0 as i32, pair[0].1 as i32);
            let (x2, y2) = (pair[1].0 as i32, pair[1].1 as i32);
            let (dx, dy) = (x2 - x1, y2 - y1);

            let (mut ax, mut ay) = (x2 - dx, y2 - dy);
            while ax >= 0 && ay >= 0 && ax < grid.cols() as i32 && ay < grid.rows() as i32 {
                set.insert((ax, ay));
                ax -= dx;
                ay -= dy;
            }

            let (mut ax, mut ay) = (x1 + dx, y1 + dy);
            while ax >= 0 && ay >= 0 && ax < grid.cols() as i32 && ay < grid.rows() as i32 {
                set.insert((ax, ay));
                ax += dx;
                ay += dy;
            }
        }
    }

    set.len()
}

#[cfg(test)]
mod tests {
    const INPUT: &str = r#"............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............"#;

    #[test]
    fn test_part1() {
        assert_eq!(super::part1(INPUT), 14);
    }

    #[test]
    fn test_part2() {
        assert_eq!(super::part2(INPUT), 34);
    }
}
