
lines_to_remove_start = 437
lines_to_remove_end = 630
file_path = r'c:\Users\nani2\OneDrive\Documents\nani\agri_digital_twin\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Adjust for 0-based index
start_index = lines_to_remove_start - 1
end_index = lines_to_remove_end

# Keep lines before start and after end
new_lines = lines[:start_index] + lines[end_index:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully removed lines.")
