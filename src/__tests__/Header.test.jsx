// קובץ פיקסצ'ר בלבד - אין test runner מוגדר בפרויקט הדמו הזה (אין jest
// ב-devDependencies וגם לא סקריפט "test"). נשמר כדי להדגים ל-migration
// scanner זיהוי של enzyme (legacy-test-renderer).
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header/Header';

describe('Header', () => {
  it('renders the app title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('Typography').exists()).toBe(true);
  });
});
