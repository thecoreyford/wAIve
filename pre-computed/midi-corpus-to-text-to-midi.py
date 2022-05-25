import glob
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
							# and not too long like finishing notes 
							if n.duration.quarterLength <= 2.0:
								# Append text representation 
								music.append("n:" + str(n.pitch.nameWithOctave) + "d:" +
							       str(n.duration.quarterLength));

	# Write to file
	with open (r'new-wave.txt', 'w') as fp:
		fp.write("\n".join(str(item) for item in music))

#================================================================================


#================================================================================	

def text_to_midi_corpus(my_file):
	# Using readlines()
	file1 = open(my_file, 'r')
	lines = file1.readlines()

	# Turn lines into a list of notes
	note_list = []
	for line in lines:
		midi_pitch = line.strip()[2:4]
		if "#" in midi_pitch:
			midi_pitch = line.strip()[2:5]
		note = m21.note.Note(midi_pitch)
		
		duration = line.strip()[6:].replace("d:","")
		if "/" in duration:
			x = duration.split("/")
			duration = float(x[0]) / float(x[1])
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
	stream.write ('midi', 'example.mid')

#============================================================================

if __name__ == "__main__":
	midi_corpus_to_text()
	text_to_midi_corpus("new-wave.txt")