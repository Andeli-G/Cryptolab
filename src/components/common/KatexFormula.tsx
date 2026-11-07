'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface KatexFormulaProps {
  formula: string;
  display?: boolean;
  className?: string;
}

export const KatexFormula: React.FC<KatexFormulaProps> = ({
  formula,
  display = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: display,
        throwOnError: false,
      });
    } catch {
      return formula;
    }
  }, [formula, display]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
