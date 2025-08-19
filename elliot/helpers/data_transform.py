import json

# File containing your dataset
input_file = "elliot/helpers/data/test/2025.json"   # Change this to your actual file name

# The training prompt template
train_prompt_style = """Below is an instruction that describes a task, paired with match-specific data for context. 
Write a response that provides a complete and actionable FRC match strategy. 
Before answering, think carefully about the robot capabilities, scoring rules, and alliance dynamics. 
Use a step-by-step chain of thought to ensure the strategy is logical, game-specific, and competitive.

### Instruction:
You are an elite FRC strategy coach with deep knowledge of the {year} game (“{game_name}”). 
Given the match data and game rules, develop the optimal strategy for the alliance to maximize win probability.

### Match Data:
{match_data}

### Relevant Game Rules:
{game_rules}

### Response:
<think>
{think}
</think>
{response}"""

# Load the data from file
with open(input_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Generate formatted prompts
filled_prompts = []

for entry in data:
    instruction_line = entry["instruction"]

    # Extract year and game name
    year_start = instruction_line.find("with deep knowledge of the ") + len("with deep knowledge of the ")
    year = instruction_line[year_start:year_start + 4]
    game_name_start = instruction_line.find("game (“") + len("game (“")
    game_name_end = instruction_line.find("”", game_name_start)
    game_name = instruction_line[game_name_start:game_name_end]

    # Parse the match data and game rules
    match_data_raw = entry["input"]
    match_data_split = match_data_raw.split("### Relevant Game Rules:")
    match_data = match_data_split[0].replace("### Match Data:\n", "").strip()
    game_rules = match_data_split[1].strip() if len(match_data_split) > 1 else ""

    # Parse <think> and strategy output
    output_raw = entry["output"]
    think_start = output_raw.find("<think>")
    think_end = output_raw.find("</think>")
    think = output_raw[think_start + len("<think>"):think_end].strip()
    response = output_raw[think_end + len("</think>"):].strip()

    # Fill the template
    full_prompt = train_prompt_style.format(
        year=year,
        game_name=game_name,
        match_data=match_data,
        game_rules=game_rules,
        think=think,
        response=response
    )

    print(full_prompt)

    filled_prompts.append(full_prompt)

# Optional: Save filled prompts to a text file (one per line or separated by separator)
output_file = "filled_prompts.txt"
with open(output_file, "w", encoding="utf-8") as f:
    for prompt in filled_prompts:
        f.write(prompt + "\n\n" + "-" * 80 + "\n\n")  # Separator between entries

print(f"{len(filled_prompts)} prompts saved to {output_file}")
