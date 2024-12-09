use anyhow::Result;
use std::collections::VecDeque;
use std::fmt::{Debug, Formatter};

fn main() -> Result<()> {
    let data = std::fs::read_to_string("input.txt")?;

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

#[derive(Debug, Clone)]
struct File(u8, usize);

#[derive(Debug, Clone)]
enum Entry {
    Space,
    File(usize),
}

fn part1(input: &str) -> usize {
    let disk = parse(input);

    let mut free_space = vec![];
    let mut files = vec![];
    let mut id = 0;

    for (idx, size) in disk.iter().enumerate() {
        if idx % 2 == 0 {
            files.push(File(*size, id));
            id += 1;
        } else {
            free_space.push(*size);
        }
    }

    if free_space.len() != files.len() {
        free_space.push(0);
    }

    let mut result = files
        .iter()
        .zip(free_space.iter())
        .flat_map(|(file, &size)| {
            let mut tmp = vec![Entry::File(file.1); file.0 as usize];
            tmp.extend(vec![Entry::Space; size as usize]);
            tmp
        })
        .collect::<VecDeque<_>>();

    let mut i = 0;
    let mut checksum = 0;

    while let Some(entry) = result.pop_front() {
        match entry {
            Entry::File(f) => {
                checksum += f * i;
            }
            Entry::Space => {
                while !result.is_empty() {
                    if let Some(Entry::File(f)) = result.pop_back() {
                        checksum += f * i;
                        break;
                    }
                }
            }
        }

        i += 1;
    }

    checksum
}

#[derive(Clone)]
enum Entry2 {
    Space(usize),
    File(usize, usize),
}

impl Debug for Entry2 {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            Entry2::Space(size) => write!(f, "{}", ".".repeat(*size)),
            Entry2::File(id, size) => write!(f, "{}", id.to_string().repeat(*size)),
        }
    }
}

impl Entry2 {
    fn checksum(&self, position: usize) -> usize {
        match self {
            Entry2::Space(_) => 0,
            Entry2::File(id, len) => (0..*len).map(|i| id * (position + i)).sum(),
        }
    }

    fn size(&self) -> usize {
        match self {
            Entry2::Space(size) => *size,
            Entry2::File(_, size) => *size,
        }
    }
}

fn part2(input: &str) -> usize {
    let disk = parse(input);
    let mut result = vec![];
    let mut id = 0;

    for (idx, size) in disk.iter().enumerate() {
        if idx % 2 == 0 {
            result.push(Entry2::File(id, *size as usize));
            id += 1;
        } else {
            result.push(Entry2::Space(*size as usize));
        }
    }

    let len = result.len();

    fragment(&mut result, len - 1);

    let mut pos = 0;
    let mut checksum = 0;
    for entry in result.iter() {
        if matches!(entry, Entry2::File(_, _)) {
            checksum += entry.checksum(pos);
        }

        pos += entry.size();
    }

    checksum
}

fn fragment(input: &mut Vec<Entry2>, index: usize) {
    if index == 0 {
        return;
    }

    let Entry2::File(id, size) = input[index] else {
        fragment(input, index - 1);
        return;
    };

    // Find space
    for i in 0..index {
        match input[i] {
            Entry2::Space(space) if space >= size => {
                let remaining = space - size;
                input[i] = Entry2::File(id, size);

                let mut shift = 0;
                if remaining > 0 {
                    input.insert(i + 1, Entry2::Space(remaining));
                    shift = 1;
                }


                input.remove(index + shift);
                input.insert(index + shift, Entry2::Space(size));

                break;
            }
            _ => {}
        }
    }

    fragment(input, index - 1);
}

fn parse(input: &str) -> Vec<u8> {
    input.as_bytes().iter().map(|c| c - b'0').collect()
}

#[cfg(test)]
mod tests {
    const INPUT: &str = r#"2333133121414131402"#;

    #[test]
    fn test_part1() {
        assert_eq!(super::part1(INPUT), 1928);
    }

    #[test]
    fn test_part2() {
        assert_eq!(super::part2(INPUT), 2858);
    }
}
