import React from 'react';
import {render} from '@testing-library/react';
import Card from './Card';

// Smoke test
it("renders without crashing", function() {
    render(<Card />);
});
