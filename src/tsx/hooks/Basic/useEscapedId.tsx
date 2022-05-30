import React, {useId} from 'react';
import escapeId from "./escapeId";

export default function useEscapedId(): string {
    return escapeId(useId());
}
