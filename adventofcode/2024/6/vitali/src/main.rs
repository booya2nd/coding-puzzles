use anyhow::Result;
use grid::Grid;
use rayon::iter::{ParallelBridge, ParallelIterator};
use std::collections::HashSet;

fn main() -> Result<()> {
    let data = std::fs::read_to_string("input.txt")?;

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

fn part1(input: &str) -> usize {
    let grid = parse(input);

    solve(&grid, find_start(&grid, &'^'), (usize::MAX, usize::MAX))
        .0
        .len()
}

fn part2(input: &str) -> usize {
    let grid = parse(input);
    let start = find_start(&grid, &'^');

    solve(&grid, start, (usize::MAX, usize::MAX))
        .0
        .into_iter()
        .par_bridge()
        .filter(|obstacle| *obstacle != start && solve(&grid, start, *obstacle).1)
        .count()
}

fn parse(input: &str) -> Grid<char> {
    let cols = input.trim().find('\n').unwrap_or_default();
    let inner = input.chars().filter(|c| *c != '\n').collect::<Vec<_>>();

    Grid::from_vec(inner, cols)
}

fn find_start<T: Eq>(grid: &Grid<T>, start: &T) -> (usize, usize) {
    grid.indexed_iter()
        .find_map(|(pos, c)| (c == start).then_some(pos))
        .unwrap()
}

fn solve(
    grid: &Grid<char>,
    (y, x): (usize, usize),
    (oy, ox): (usize, usize),
) -> (HashSet<(usize, usize)>, bool) {
    let mut visited = HashSet::new();
    let (mut dx, mut dy) = (0, -1);
    let (mut y, mut x) = (y as isize, x as isize);

    let mut not_quit = true;
    while visited.insert((y, x, dx, dy)) {
        (y, x, dx, dy) = match grid.get(y + dy, x + dx) {
            Some('#') => (y, x, -dy, dx),
            Some('.') if oy as isize == y + dy && ox as isize == x + dx => (y, x, -dy, dx),
            None => {
                not_quit = false;
                break;
            }
            _ => (y + dy, x + dx, dx, dy),
        }
    }

    (
        visited
            .iter()
            .map(|(y, x, _, _)| (*y as usize, *x as usize))
            .collect(),
        not_quit,
    )
}

#[cfg(test)]
mod tests {
    const INPUT: &str = r#"....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#..."#;

    #[test]
    fn test_part1() {
        assert_eq!(super::part1(INPUT), 41);
    }

    #[test]
    fn test_part2() {
        assert_eq!(super::part2(INPUT), 6);
    }
}
