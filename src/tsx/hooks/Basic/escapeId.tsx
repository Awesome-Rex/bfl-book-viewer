import React from 'react';

export default function escapeId(id: string) { // make id usable as a ...
	return id.replace(/\W/g, (m) => "\\" + m.charCodeAt(0).toString(16) + " ");
}
