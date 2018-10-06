import React from 'react';
import { CustomInput } from '../CustomInput';

import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('CustomInput', () => {

    it('should render properly input', () => {
        const mockField = {
            name: 'testInput',
            type: 'text'
        };

        const mockForm = {
            touched: {
                firstName: true,
            },
            errors: {
                firstName: ''
            }
        };

        const normalInput = shallow(
            <CustomInput field={mockField} form={mockForm} />
        );

        expect(toJson(normalInput)).toMatchSnapshot();
    });

    it('should render input with error when input has errors and was touched', () => {
        const mockForm = {
            touched: {
                testInput: true,
            },
            errors: {
                testInput: 'required'
            }
        };
        const mockField = {
            name: 'testInput',
            type: 'text'
        };
        
        const errorInput = shallow(
            <CustomInput field={mockField} form={mockForm} />
        );

        expect(toJson(errorInput)).toMatchSnapshot();

        expect(errorInput.find('.error-msg').text()).toBe('* required');
    });

});