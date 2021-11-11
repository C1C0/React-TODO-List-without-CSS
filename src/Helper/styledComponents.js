import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { ColorPalette, StylingPatterns } from "./colorPallete";

export const MainTitle = styled.h1`
  text-align: center;

  span {
    font-size: 0.5em;
  }
`;

export const Container = styled.div`
  width: 45vw;
  margin: auto;
  box-shadow: 5px 2px 15px ${ColorPalette.mainShadow};
  padding: 1.8rem;
  border-radius: ${StylingPatterns.defaultRadius};
  font-family: "Nunito", sans-serif;
`;

export const CreateTodoFormFieldset = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexOption || "row"};
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
CreateTodoFormFieldset.propTypes = {
  flexOption: PropTypes.string
};

export const CreateTodoForm = styled.form`
  padding: ${StylingPatterns.sectionsPadding};

  label {
    margin-bottom: 8px;
  }

  input {
    box-sizing: border-box;
    border: none;
    padding: 0.5rem;
    box-shadow: 0 2px 1px -1px ${ColorPalette.primaryLight};

    transition: outline 0.05s ease;

    &[type="submit"] {
      background-color: ${ColorPalette.primaryDark};
      color: #fff;
      box-shadow: none;
      border-radius: ${StylingPatterns.buttonRadius};
      padding: 5px 20px;

      transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;

      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 5px 5px ${ColorPalette.mainShadow};
      }

      &:focus {
        outline: 2px solid ${ColorPalette.primaryDark};
      }
    }

    &:focus {
      outline: 2px solid ${ColorPalette.primaryLight};
    }
  }
`;

export const SectionDivider = styled.hr`
  border-color: ${ColorPalette.primaryLight};
  margin: 1.5rem 0;
`;

export const SectionTitle = styled.p`
  font-size: 1.1em;
  text-align: center;
  color: ${(props) => (props.color ? props.color : "#000")};
  padding-bottom: 10px;
`;
SectionTitle.propTypes = {
  color: PropTypes.string
};

export const TodosSection = styled.div`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ""};
  padding: ${StylingPatterns.sectionsPadding} 2rem;
  border-radius: ${StylingPatterns.defaultRadius};
`;
TodosSection.propTypes = {
  backgroundColor: PropTypes.string
};

export const TodoTextsWrapper = styled.div`
  flex: 1;
`;

export const TodoDescription = styled.p`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ""};
  color: ${(props) => (props.color ? props.color : "initial")};
  margin: 0;
  margin-bottom: 5px;
  font-weight: bold;
`;
TodoDescription.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string
};

export const TodoCompleteBy = styled.p`
  margin: 0;
  color: ${ColorPalette.darkGrey};
  font-size: 0.8em;
`;

export const TodoCheckbox = styled.input`
  height: 13px;
  width: 13px;
  margin-top: 4px;

  &:checked {
    color: blueviolet;
    background-color: white;
  }
`;

export const TodoLi = styled.li`
  display: flex;
  position: relative;
  gap: 10px;
  margin-bottom: 0.3rem;
`;
