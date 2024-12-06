use anyhow::Result;
use grid::Grid;
use std::collections::HashSet;

fn main() -> Result<()> {
    let data = std::fs::read_to_string("input.txt")?;

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

fn part1(input: &str) -> usize {
    let grid = parse(input);
    let start = grid
        .indexed_iter()
        .find_map(|(pos, &c)| (c == '^').then_some(pos))
        .unwrap();

    get_visited(&grid, start).len()
}

fn part2(input: &str) -> usize {
    let mut grid = parse(input);
    let start = grid
        .indexed_iter()
        .find_map(|(pos, &c)| (c == '^').then_some(pos))
        .unwrap();

    let visited = get_visited(&grid, start);

    visited
        .into_iter()
        .filter(|pos| {
            if *pos == start {
                return false;
            }

            *grid.get_mut(pos.0, pos.1).unwrap() = '#';
            let result = has_loop(&grid, start);
            *grid.get_mut(pos.0, pos.1).unwrap() = '.';

            result
        })
        .count()
}

fn parse(input: &str) -> Grid<char> {
    let cols = input.trim().find('\n').unwrap_or_default();
    let inner = input.chars().filter(|c| *c != '\n').collect::<Vec<_>>();

    Grid::from_vec(inner, cols)
}

fn get_visited(grid: &Grid<char>, (y, x): (usize, usize)) -> HashSet<(usize, usize)> {
    let mut visited = HashSet::new();
    let (mut dx, mut dy) = (0, -1);
    let (mut y, mut x) = (y as isize, x as isize);

    loop {
        visited.insert((y as usize, x as usize));
        let (nx, ny) = (x + dx, y + dy);

        match grid.get(ny, nx) {
            Some('#') => {
                (dx, dy) = (-dy, dx);
            }
            None => break,
            _ => {
                (x, y) = (nx, ny);
            }
        }
    }

    visited
}

fn has_loop(grid: &Grid<char>, (y, x): (usize, usize)) -> bool {
    let mut visited = HashSet::new();
    let (mut dx, mut dy) = (0, -1);
    let (mut y, mut x) = (y as isize, x as isize);
    let mut cnt = 1;

    loop {
        if !visited.insert((y, x)) {
            cnt += 1;
            if cnt > visited.len() * 2 {
                return true;
            }
        }

        let (nx, ny) = (x + dx, y + dy);

        match grid.get(ny, nx) {
            Some('#') => {
                (dx, dy) = (-dy, dx);
            }
            None => break,
            _ => {
                (x, y) = (nx, ny);
            }
        }
    }

    false
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
