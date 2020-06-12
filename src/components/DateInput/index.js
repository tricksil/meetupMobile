import React, { useState, useMemo, useCallback } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, ButtonDate, TextDate, Preview } from './styles';

const DateInput = ({ date, onChange }) => {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM", {
        locale: pt,
      }),
    [date],
  );

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpened(Platform.OS === 'ios');
    onChange(currentDate);
  };

  const incrementDays = () => {
    onChange(addDays(date, 1));
  };

  const decrementDays = () => {
    onChange(subDays(date, 1));
  };

  const isPrev = useCallback(() => isBefore(date, new Date()), [date]);

  return (
    <Container>
      <TouchableOpacity onPress={decrementDays} disabled={isPrev()}>
        <Icon name="chevron-left" size={40} color="#fff" />
      </TouchableOpacity>
      <ButtonDate onPress={() => setOpened(!opened)}>
        <TextDate>{dateFormatted}</TextDate>
      </ButtonDate>
      <TouchableOpacity onPress={incrementDays}>
        <Icon name="chevron-right" size={40} color="#fff" />
      </TouchableOpacity>

      {opened &&
        (Platform.OS === 'ios' ? (
          <>
            <Preview>
              <DatePicker
                value={date}
                mode="date"
                display="default"
                locale="pt"
                minimumDate={new Date()}
                minuteInterval={60}
                onChange={onChangeTime}
              />
            </Preview>
          </>
        ) : (
          <>
            <DatePicker
              value={date}
              mode="date"
              display="default"
              locale="pt"
              minuteInterval={60}
              minimumDate={new Date()}
              onChange={onChangeTime}
            />
          </>
        ))}
    </Container>
  );
};

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateInput;
