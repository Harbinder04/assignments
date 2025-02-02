import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, forceRender] = useState(0);
    
    const numberOfRerender = useRef(0);
    const handleReRender = () => {
        // Update state to force re-render
        const timeOfrerender = Math.floor(Math.random() * 10);
        numberOfRerender.current += 1;
        forceRender(timeOfrerender);
    };
    

    return (
        <div>
            <p>This component has rendered {numberOfRerender.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};