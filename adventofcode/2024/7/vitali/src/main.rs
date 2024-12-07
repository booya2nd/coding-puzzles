fn main() -> anyhow::Result<()> {
    let data = std::fs::read_to_string("input.txt")?;

    println!("Part #1: {}", part(&data, false));
    println!("Part #2: {}", part(&data, true));

    Ok(())
}

fn part(input: &str, enable_concat: bool) -> i64 {
    input
        .lines()
        .filter_map(|line| {
            let (result, nums) = line.split_once(": ").unwrap();
            let result = result.parse::<i64>().unwrap();
            let nums = nums
                .split_ascii_whitespace()
                .map(|num| num.parse().unwrap())
                .collect::<Vec<_>>();

            solve(result, nums[0], &nums[1..], enable_concat).then_some(result)
        })
        .sum()
}

fn solve(result: i64, current: i64, nums: &[i64], enable_concat: bool) -> bool {

    if current > result {
        return false;
    }

    if nums.is_empty() {
        return result == current;
    }

    solve(result, current + nums[0], &nums[1..], enable_concat)
        || solve(result, current * nums[0], &nums[1..], enable_concat)
        || (enable_concat
            && solve(
                result,
                10i64.pow(nums[0].to_string().len() as u32) * current + nums[0],
                &nums[1..],
                enable_concat,
            ))
}

#[cfg(test)]
mod tests {
    const INPUT: &str = r#"190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20"#;

    #[test]
    fn test_part1() {
        assert_eq!(super::part(INPUT, false), 3749);
    }

    #[test]
    fn test_part2() {
        assert_eq!(super::part(INPUT, true), 11387);
    }
}
