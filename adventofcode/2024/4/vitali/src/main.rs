use std::str::FromStr;

use itertools::iproduct;

#[derive(Debug)]
struct Matrix<T> {
    inner: Vec<T>,
    width: usize,
    height: usize,
}

impl<T> Matrix<T> {
    fn get(&self, x: isize, y: isize) -> Option<&T> {
        if x < 0 || y < 0 || x >= self.width as isize || y >= self.height as isize {
            return None;
        }

        self.inner.get(y as usize * self.width + x as usize)
    }

    fn iter_xy(&self) -> impl Iterator<Item = (isize, isize)> {
        iproduct!(0..self.width, 0..self.height).map(|(x, y)| (x as isize, y as isize))
    }
}

impl FromStr for Matrix<char> {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let width = s.find('\n').unwrap_or_default();
        let inner = s.chars().filter(|c| *c != '\n').collect::<Vec<_>>();

        Ok(Self {
            width,
            height: inner.len() / width,
            inner,
        })
    }
}

fn part1(matrix: &Matrix<char>) -> usize {
    matrix
        .iter_xy()
        .map(|(x, y)| {
            iproduct!(-1..=1, -1..=1)
                .filter(|(dx, dy)| {
                    (0..4)
                        .filter_map(|i| matrix.get(x + dx * i, y + dy * i))
                        .eq([&'X', &'M', &'A', &'S'])
                })
                .count()
        })
        .sum()
}

fn part2(matrix: &Matrix<char>) -> usize {
    matrix
        .iter_xy()
        .filter(|&(x, y)| {
            matches!(matrix.get(x, y), Some(&'A'))
                && [(x - 1, y - 1, x + 1, y + 1), (x + 1, y - 1, x - 1, y + 1)]
                    .iter()
                    .all(|&(x1, y1, x2, y2)| {
                        matches!(
                            (matrix.get(x1, y1), matrix.get(x2, y2)),
                            (Some('M'), Some('S')) | (Some('S'), Some('M'))
                        )
                    })
        })
        .count()
}

fn main() -> anyhow::Result<()> {
    let matrix = std::fs::read_to_string("input.txt")?.parse::<Matrix<char>>()?;

    println!("Part #1: {}", part1(&matrix));
    println!("Part #2: {}", part2(&matrix));

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

        let matrix = inp.parse::<Matrix<char>>().unwrap();
        assert_eq!(super::part1(&matrix), 4);
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
        let matrix = inp.parse::<Matrix<char>>().unwrap();
        assert_eq!(super::part1(&matrix), 18);
    }

    #[test]
    fn test_part2_1() {
        let inp = r#"M.S
.A.
M.S"#;

        let matrix = inp.parse::<Matrix<char>>().unwrap();
        assert_eq!(super::part2(&matrix), 1);
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
        let matrix = inp.parse::<Matrix<char>>().unwrap();
        assert_eq!(super::part2(&matrix), 9);
    }
}
