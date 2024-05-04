import Conversation from '../models/chat.model.js';

export const addMsgToConversation = async (participants, msg) => {
	try {
		// Find conversation by participants
		let conversation = await Conversation.findOne({
			users: { $all: participants }
		});

		// If conversation do not exist, create a new one
		if (!conversation) {
			conversation = await Conversation.create({ users: participants });
		}

		// Add msg to the conversation
		conversation.msgs.push(msg);
		await conversation.save();
	} catch (error) {
		console.log('Error adding message to conversation: ', error.message);
	}
};

export const getMsgsForConversation = async (req, res) => {
	try {
		const { sender, receiver } = req.query;
		// console.log(sender + receiver);
		const participants = [sender, receiver];

		// Find conversation by participants
		const conversation = await Conversation.findOne({
			users: { $all: participants }
		});

		if (!conversation) {
			console.log(`Conversation not found between ${sender} and ${receiver}`);
			return res.status(200).send();
		}

		return res.json(conversation.msgs);
	} catch (error) {
		console.log('Error fetching messages: ', error.message);
		res.status(500).json({ error: 'Server Error' });
	}
};

export default getMsgsForConversation;
