import React from 'react';

export default function escapeId(id: string) {
	return id.replace(/\W/g, (m) => "\\" + m.charCodeAt(0).toString(16) + " ");
}
