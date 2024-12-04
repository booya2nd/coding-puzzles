use anyhow::Result;
use itertools::iproduct;
use ndarray::Array2;

trait Relative<T> {
    fn get_relative(&self, x: usize, y: usize, dx: isize, dy: isize) -> Option<&T>;
}

impl Relative<char> for Array2<char> {
    fn get_relative(&self, x: usize, y: usize, dx: isize, dy: isize) -> Option<&char> {
        let (x, y) = (x as isize + dx, y as isize + dy);
        (x >= 0 && y >= 0 && x < self.nrows() as isize && y < self.ncols() as isize)
            .then(|| self.get((x as usize, y as usize)))?
    }
}

fn parse(input: &str) -> Result<Array2<char>> {
    let cols = input.find('\n').unwrap_or_default();
    let inner = input.chars().filter(|c| *c != '\n').collect::<Vec<_>>();

    Ok(Array2::from_shape_vec((inner.len() / cols, cols), inner)?)
}

fn part2(arr: &Array2<char>) -> usize {
    arr.indexed_iter()
        .filter(|&(_, &c)| c == 'A')
        .filter(|&((x, y), _)| {
            [(-1, -1, 1, 1), (1, -1, -1, 1)]
                .iter()
                .all(|&(dx1, dy1, dx2, dy2)| {
                    matches!(
                        (
                            arr.get_relative(x, y, dx1, dy1),
                            arr.get_relative(x, y, dx2, dy2)
                        ),
                        (Some('M'), Some('S')) | (Some('S'), Some('M'))
                    )
                })
        })
        .count()
}

fn part1(arr: &Array2<char>) -> usize {
    arr.indexed_iter()
        .filter(|&(_, &c)| c == 'X')
        .map(|((x, y), _)| {
            iproduct!(-1..=1, -1..=1)
                .filter(|&(dx, dy)| {
                    (1..4)
                        .filter_map(|i| arr.get_relative(x, y, dx * i, dy * i))
                        .eq(['M', 'A', 'S'].iter())
                })
                .count()
        })
        .sum()
}

fn main() -> Result<()> {
    let data = parse(&std::fs::read_to_string("input.txt")?)?;

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1_1() {
        let inp = r#"..X...
.SAMX.
.A..A.
XMAS.S
.X...."#;

        assert_eq!(super::part1(&parse(inp).unwrap()), 4);
    }

    #[test]
    fn test_part1_2() {
        let inp = r#"MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX"#;
        assert_eq!(super::part1(&parse(inp).unwrap()), 18);
    }

    #[test]
    fn test_part2_1() {
        let inp = r#"M.S
.A.
M.S"#;

        assert_eq!(super::part2(&parse(inp).unwrap()), 1);
    }

    #[test]
    fn test_part2_2() {
        let inp = r#".M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
.........."#;

        assert_eq!(super::part2(&parse(inp).unwrap()), 9);
    }
}
