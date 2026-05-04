
file_path = r'c:\Users\nani2\OneDrive\Documents\nani\agri_digital_twin\index.html'

# Lines to remove (inclusive, 1-based)
start_line = 143
end_line = 216

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Adjust for 0-based index
start_index = start_line - 1
end_index = end_line

# Keep lines before start and after end
new_lines = lines[:start_index] + lines[end_index:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully removed lines.")
