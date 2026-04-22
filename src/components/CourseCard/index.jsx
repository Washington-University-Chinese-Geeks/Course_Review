import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export default function CourseCard({code, title, description, to, hasReview}) {
  const Wrapper = to ? Link : 'div';
  const wrapperProps = to ? {to} : {};
  return (
    <div className="course-card">
      <Wrapper {...wrapperProps}>
        <div className="course-card__code">{code}</div>
        <div className="course-card__title">{title}</div>
        {description && <p className="course-card__desc">{description}</p>}
        {hasReview && (
          <span className="course-card__has-review">
            <Translate id="courseCard.hasReview">has review</Translate>
          </span>
        )}
      </Wrapper>
    </div>
  );
}
