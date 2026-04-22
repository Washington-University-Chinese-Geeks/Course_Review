import React from 'react';
import Translate from '@docusaurus/Translate';

export default function CourseInfo({
  code,
  oldCodes = [],
  title,
  lastOffered,
  credits,
  link,
  description,
}) {
  return (
    <div className="course-info">
      <div className="course-info__header">
        <span className="course-info__code">{code}</span>
        <span className="course-info__title">{title}</span>
        {oldCodes.length > 0 && (
          <span className="course-info__old-codes">
            <Translate id="courseInfo.oldCodes" description="Label for old course numbers">
              old:
            </Translate>{' '}
            {oldCodes.join(', ')}
          </span>
        )}
      </div>
      <div className="course-info__meta">
        {lastOffered && (
          <span>
            <strong>
              <Translate id="courseInfo.lastOffered">Last offered</Translate>:
            </strong>{' '}
            {lastOffered}
          </span>
        )}
        {credits && (
          <span>
            <strong>
              <Translate id="courseInfo.credits">Credits</Translate>:
            </strong>{' '}
            {credits}
          </span>
        )}
        {link && (
          <span>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Translate id="courseInfo.catalogLink">WashU Bulletin ↗</Translate>
            </a>
          </span>
        )}
      </div>
      {description && <p className="course-info__description">{description}</p>}
    </div>
  );
}
