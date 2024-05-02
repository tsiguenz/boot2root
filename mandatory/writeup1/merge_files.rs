use std::fs;
use std::io::{self, Write, BufRead};

fn get_file_number(file_path: &str) -> i32 {
	let file = io::BufReader::new(fs::File::open(file_path).unwrap());
	let mut lines = file.lines().map(|line| line.unwrap()).collect::<Vec<_>>();
	let last_line = lines.pop().unwrap();
	let parts = last_line.split("//file").collect::<Vec<_>>();
	if parts.len() != 2 {
		panic!("Invalid file format: {}", file_path);
	}

	parts[1].parse::<i32>().unwrap()
}

fn main() -> io::Result<()> {
    let folder_path = "ft_fun";
	let output_file = "ft_fun.c";

	let mut files = fs::read_dir(folder_path)?
		.filter_map(|entry| entry.ok())
		.map(|entry| entry.path())
		.filter(|path| path.is_file())
		.collect::<Vec<_>>();

	files.sort_by_key(|path| get_file_number(path.to_str().unwrap()));

	let mut output = fs::File::create(output_file)?;
	for file in files {
		let content = fs::read(file)?;
		output.write_all(&content)?;
		output.write_all(b"\n")?;
	}
	println!("Done merging files into {}", output_file);

    Ok(())
}
