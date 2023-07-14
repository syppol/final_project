import React, { useState } from 'react';
import styled from 'styled-components/macro';
import DocsCard from './DocsCard/DocsCard';
import css from './Docksview.module.css';
import { getImg, getText } from '../../../../../../Functions/parseContent'

const DocsCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MoreButton = styled.button`
  padding: 10px 20px;
  color: #FFF;
  font-family: 'Inter';
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.88px;
  border: none;
  cursor: pointer;
  background-color: #5970ff;
  border-radius: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const Docksview = () => {
  const data = JSON.parse(localStorage.getItem('docs'));
  const [displayCount, setDisplayCount] = useState(2);

  if (!data || !Array.isArray(data)) {
    return <p>No documents found.</p>;
  }

  const handleMoreClick = () => {
    setDisplayCount((prevCount) => prevCount + 2);
  }

  return (
    <div>
      <DocsCardContainer className={css.cardContainer}>
        {data.slice(0, displayCount).map((document) => (
          <DocsCard
            key={document.ok.id}
            date={document.ok.issueDate.split('T')[0]}
            source={document.ok.source.name}
            title={document.ok.title.text}
            img={getImg(document.ok.content.markup)}
            desc={getText(document.ok.content.markup)}
            link={document.ok.url}
            wordCount={document.ok.attributes.wordCount}
            isTechNews={document.ok.attributes.isTechNews}
            isAnnouncement={document.ok.attributes.isAnnouncement}
            isDigest={document.ok.attributes.isDigest}
          />
        ))}
      </DocsCardContainer>
      {displayCount < data.length &&
        <ButtonWrapper>
          <MoreButton onClick={handleMoreClick}>Показать больше</MoreButton>
        </ButtonWrapper>
      }
    </div>
  );
};


export default Docksview;
