import glob
import pandas as pd
import music21 as m21

def midi_corpus_to_text():
	# Load and tokenize the data 
	filenames = glob.glob("dataset/new-wave/*.mid")

	music = []

	for files in range (len(filenames)):	
		print(filenames[files])
		
		# Load the MIDI file and parse it into CSV format
		midi = m21.converter.parse(filenames[files])
		
		for parts in midi:
			for n in parts: #<--- for the different parts
				if "rest" not in str(n):
					if "note" in str(n):
						# Only add notes that can be used in our interface... 
						if n.pitch.midi in [72, 71, 69, 67, 65, 64, 62, 60]:
							# and must be quantised to our grid... 
							if n.duration.quarterLength in [0.0, 0.25, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0]:
								# Append text representation 
								music.append("n:" + str(n.pitch.nameWithOctave) + "d:" +
							       str(n.duration.quarterLength));

	# Write to file
	with open (r'new-wave.txt', 'w') as fp:
		fp.write("\n".join(str(item) for item in music))

#================================================================================

def text_to_midi_corpus(my_file, midi_output_name):
	# Using readlines()
	file1 = open(my_file, 'r')
	lines = file1.readlines()

	# Turn lines into a list of notes
	note_list = []
	for line in lines:
		midi_pitch = line.strip()[2:4]
		# if "#" in midi_pitch:
		# 	midi_pitch = line.strip()[2:5]
		note = m21.note.Note(midi_pitch)
		
		duration = line.strip()[6:].replace("d:","")
		# if "/" in duration:
		# 	x = duration.split("/")
		# 	duration = float(x[0]) / float(x[1])
		note.duration.quarterLength = float(duration)

		note_list.append(note)

	# Write notes to a stream
	stream = m21.stream.Stream()
	for note in note_list:
		print ("Appending..." + str(note))
		stream.append(note)

	# Write to file 
	print ("Writing...")
	print ("NOTE: If text is long this may take a little while ...")
	stream.write ('midi', midi_output_name)

#============================================================================

def generated_text_to_block_sized_files(generated_text_file):
	file = open(generated_text_file, 'r')
	lines = file.readlines()

	small_midi = []
	accum = 0.0
	counter = 1
	for l in range(len(lines)):
		# Check is the line is mangled...
		try:
			midi_pitch = lines[l].strip()[2:4]
			duration = lines[l].strip()[6:].replace("d:","")
			duration = float(duration)
		except:
			continue;

		# If line is not mangled 
		if accum < 2.0:
			small_midi.append(lines[l])
			accum += duration
		else:
			# Write to file
			with open (r'dataset/final_text/generation' + str(counter) + '.txt', 'w') as fp:
				fp.write("".join(str(item) for item in small_midi))
				counter = counter + 1;

			#reset array
			small_midi = []
			accum = 0.0


#============================================================================

def convert_to_dataset():
	# # First turn all into midi
	# filenames = glob.glob("dataset/final_text/*.txt")
	# for i in range(len(filenames)):
	# 	try:
	# 		text_to_midi_corpus(filenames[i], 'dataset/final_midi/example' + str(i+1) + '.mid')
	# 	except:
	# 		print("Issue with ", str(i+1));

	#Create the dataframe 
	data = {"extract":[],
			"music_grid":[],
			"pitch_count":[], # Number of pitches used atleast once
			"pitch_range":[], # Difference between highest and lowest pitches semitones
			"average_pitch_interval":[]} #Average melodic interval (in semitones).

	filenames = glob.glob("dataset/final_midi/*.mid")
	for i in range(len(filenames)):
		# load the midi file
		file = m21.converter.parse(filenames[i], format="midi")

		# for the musical metrics
		try:
			data["average_pitch_interval"].append(m21.features.jSymbolic.AverageMelodicIntervalFeature(file).extract().vector[0])
		except:
			print("Issue with... ", filenames[i])
			continue; #<-- run away 

		# store the features
		data["pitch_count"].append(m21.features.jSymbolic.PitchVarietyFeature(file).extract().vector[0])
		data["pitch_range"].append(m21.features.jSymbolic.RangeFeature(file).extract().vector[0])

		# store the file name 
		data["extract"].append(filenames[i])

		#====================================
		# now lets calculate the grid array
		generated_text_file = filenames[i].replace('midi', 'text').replace('mid', 'txt').replace('example', 'generation')
		
		file = open(generated_text_file, 'r')
		lines = file.readlines()

		grid_data = {"midi_pitch": [], "duration": []}
		for l in range(len(lines)):
			grid_data["midi_pitch"].append(lines[l].strip()[2:4]);
			grid_data["duration"].append(float(lines[l].strip()[6:].replace("d:","")))
		grid_df = pd.DataFrame.from_dict(grid_data)
		
		# Using Dataframe manipulate to get the indexes needed in cum sum 
		grid_df["x4"] = grid_df["duration"] * 4
		grid_df["x4_shifted"] =	grid_df["x4"].shift(periods=1, fill_value=0)
		grid_df["cum_sum"] = grid_df["x4_shifted"].cumsum()

		
		grid = []
		notes = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'] # we go backwards to match the
																 # interface code... 
		for n in range(8): #for each of the notes 
			for i in range(8): #start with all zeros
				grid.append(0)

			for x in grid_df[grid_df["midi_pitch"] == notes[n]]["cum_sum"]:
				grid[(n * 8) + int(x)] = 1

		data["music_grid"].append(grid)	
			
		#====================================

	df = pd.DataFrame.from_dict(data)
	df.to_csv("generated_block_data.csv")

#============================================================================

if __name__ == "__main__":
	# midi_corpus_to_text()
	# text_to_midi_corpus("new-wave.txt")
	# generated_text_to_block_sized_files("generated.txt")
	convert_to_dataset();


