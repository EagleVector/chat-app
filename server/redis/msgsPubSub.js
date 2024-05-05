import Redis from 'ioredis';

import dotenv from 'dotenv';
dotenv.config();

const subscriber = new Redis({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PWD,
	username: process.env.REDIS_USER
});

const publisher = new Redis({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PWD,
	username: process.env.REDIS_USER
});

export function subscribe(channel, callback) {
	subscriber.subscribe(channel, (err, count) => {
		if (err) {
			console.error('Error Subscribing to the channel: ', err);
			return;
		}
		console.log(`Subscribed to ${channel}`);
	});

	subscriber.on('message', (subscribedChannel, message) => {
		if (subscribedChannel === channel) {
			callback(message);
		}
	});
}

export function unsubscribe(channel) {
	subscriber.unsubscribe(channel, (err, count) => {
		if (err) {
			console.error('Error Unsubscribing from the channel: ', err);
			return;
		}
		console.log(`Unsubscribed from ${channel}`);
	});
}

export async function publish(channel, message) {
	try {
		await publisher.publish(channel, message);
		console.log(`Published message to ${channel}: ${message}`);
	} catch (error) {
		console.error('Error publishing message ', error);
	}
}