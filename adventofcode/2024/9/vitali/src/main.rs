use anyhow::Result;
use std::collections::VecDeque;

#[derive(Clone)]
enum Entry {
    Space(usize),
    File(usize, usize),
}

impl Entry {
    fn checksum(&self, position: usize) -> usize {
        match self {
            Entry::Space(_) => 0,
            Entry::File(id, len) => {
                // Sum of arithmetic sequence
                (position + position + len - 1) * len / 2 * id
            }
        }
    }

    fn size(&self) -> usize {
        match self {
            Entry::Space(size) => *size,
            Entry::File(_, size) => *size,
        }
    }
}

fn main() -> Result<()> {
    let data = std::fs::read_to_string("input.txt")?;

    println!("Part #1: {}", part1(&data));
    println!("Part #2: {}", part2(&data));

    Ok(())
}

fn part1(input: &str) -> usize {
    let mut disk = parse(input).into_iter().collect::<VecDeque<_>>();

    let mut pos = 0;
    let mut checksum = 0;

    while let Some(entry) = disk.pop_front() {
        match entry {
            Entry::File(_, file_size) => {
                checksum += entry.checksum(pos);
                pos += file_size;
            }
            Entry::Space(space_size) => {
                while let Some(entry) = disk.pop_back() {
                    if let Entry::File(id, file_size) = entry {
                        if space_size < file_size {
                            disk.push_back(Entry::File(id, file_size - space_size));
                        } else if space_size != file_size {
                            disk.push_front(Entry::Space(space_size - file_size));
                        }

                        checksum += Entry::File(id, file_size.min(space_size)).checksum(pos);
                        pos += file_size.min(space_size);

                        break;
                    }
                }
            }
        }
    }

    checksum
}

fn part2(input: &str) -> usize {
    let mut disk = parse(input);

    let len = disk.len();
    fragment(&mut disk, len - 1);

    disk.iter()
        .fold((0, 0), |(checksum, position), entry| {
            (
                checksum
                    + matches!(entry, Entry::File(_, _))
                        .then(|| entry.checksum(position))
                        .unwrap_or(0),
                position + entry.size(),
            )
        })
        .0
}

fn fragment(input: &mut Vec<Entry>, index: usize) {
    if index == 0 {
        return;
    }

    let entry = &input[index];
    let Entry::File(_, file_size) = input[index] else {
        fragment(input, index - 1);
        return;
    };

    if let Some((space_index, space_size)) =
        input[..index]
            .iter()
            .enumerate()
            .find_map(|(i, entry)| match entry {
                Entry::Space(size) if *size >= file_size => Some((i, *size)),
                _ => None,
            })
    {
        let remaining = space_size - file_size;
        input[space_index] = entry.clone();

        input.remove(index);
        if remaining > 0 {
            input.insert(space_index + 1, Entry::Space(remaining));
        }

        input.insert(index, Entry::Space(file_size));
    }

    fragment(input, index - 1);
}

fn parse(input: &str) -> Vec<Entry> {
    input
        .as_bytes()
        .iter()
        .map(|c| c - b'0')
        .enumerate()
        .scan(0, |id, (idx, size)| {
            Some(if idx % 2 == 0 {
                *id += 1;
                Entry::File(*id - 1, size as usize)
            } else {
                Entry::Space(size as usize)
            })
        })
        .collect()
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
