use std::str::FromStr;

use nom::{
    branch::alt,
    bytes::complete::tag,
    character::complete::{self, digit1},
    combinator::{map, map_res},
    multi::many0,
    sequence::{delimited, separated_pair},
    IResult,
};

#[derive(Debug, PartialEq, Eq)]
enum Op {
    Mul(i32, i32),
    Dont,
    Do,
    None,
}

fn parse_int(input: &str) -> IResult<&str, i32> {
    map_res(digit1, FromStr::from_str)(input)
}

fn parse_mul(i: &str) -> IResult<&str, Op> {
    delimited(
        tag("mul("),
        map_res(
            separated_pair(parse_int, complete::char(','), parse_int),
            |(a, b)| Ok::<_, ()>(Op::Mul(a, b)),
        ),
        tag(")"),
    )(i)
}

fn parse_op(i: &str) -> IResult<&str, Op> {
    alt((
        parse_mul,
        map(tag("do()"), |_| Op::Do),
        map(tag("don't()"), |_| Op::Dont),
    ))(i)
}

fn parse(input: &str) -> Vec<Op> {
    let (_, ops) = many0(map(
        alt((parse_op, map(complete::anychar, |_| Op::None))),
        |op| match op {
            Op::None => None,
            _ => Some(op),
        },
    ))(input)
    .expect("Failed to parse input");

    ops.into_iter().flatten().collect()
}

fn part1(ops: &[Op]) -> i32 {
    ops.iter()
        .filter_map(|op| match op {
            Op::Mul(a, b) => Some(a * b),
            _ => None,
        })
        .sum()
}

fn part2(ops: &[Op]) -> i32 {
    let mut result = 0;
    let mut enabled = true;

    for op in ops {
        match op {
            Op::Mul(a, b) if enabled => {
                result += a * b;
            }
            Op::Dont => enabled = false,
            Op::Do => enabled = true,
            _ => {}
        }
    }

    result
}

fn main() -> anyhow::Result<()> {
    let data = parse(&std::fs::read_to_string("input.txt")?);

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    const INPUT: &str =
        r#"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"#;

    #[test]
    fn test_parse() {
        let result = parse(INPUT);
        assert_eq!(
            result,
            vec![
                Op::Mul(2, 4),
                Op::Dont,
                Op::Mul(5, 5),
                Op::Mul(11, 8),
                Op::Do,
                Op::Mul(8, 5)
            ]
        );
    }
}
