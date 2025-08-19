"""
You have the skillset of the best data scientist in the world, capable of creating accurate training data for llms. 

Your task is to use the provided data and generate training data for a llm using the defined train_prompt_style.
You will be provided with a dataset for a specific year for a specific first robotics competition game.

You should generate an item for each match in the {year}_matches.json for the train split. 

If there are enough matches for a given year, then
You should also generate 500 items for the test split and 500 items for the validation split.
If there are not at least 500 matches in a given year, then generate 20 items for the test split and validation split.

In the provided data, the {year}GameManual.pdf contains the game-specific rules. You should consider these rules in your response generation,
and treat them as absolute law, especially above any other rule or logic you may have that will violate them.

You will also be provided with a {year}_insights file. This file contains additional team-specific metrics.

Within train_prompt_style, you will notice a match data section. This section is where frc students will input information about a specific match,
and expect a concise match strategy to be outputted from it by an llm. The match data prompt may include some metrics, but will most
likely be based on qualitative observations and data, rather then hard numbers. For example, you may be provided
with details such as "team 254 is high-scoring, but lacks the ability to coordinate with 1710", or "team 245 
has strong defense, and when scoring frequently jams". Ensure your training items reflect this, the data provided will make providing these
qualitative items difficult, so use the data to deduce potential qualitative information that seems reasonable within an
first robotics competition game. 

Your output training data should be a flat json-list of filled-in train_prompt_style results
You should output your result in the following file-structure format:

-data
--train
---{year}.json
--test
---{year}.json
--validate
---{year}.json

Before beginning any work of generating the output, be sure to analyze my request, the data, and then ask clarifiying 
questions to me to ensure the eventual dataset is precise.
"""


train_prompt_style = """Below is an instruction that describes a task, paired with match-specific data for context. 
Write a response that provides a complete and actionable FRC match strategy. 
Before answering, think carefully about the robot capabilities, scoring rules, and alliance dynamics. 
Use a step-by-step chain of thought to ensure the strategy is logical, game-specific, and competitive.

### Instruction:
You are an elite FRC strategy coach with deep knowledge of the {year} game (“{game_name}”). 
Given the match data and game rules, develop the optimal strategy for the alliance to maximize win probability.

### Match Data:
{}

### Relevant Game Rules:
{}

### Response:
<think>
{}
</think>
{}"""
