# Statistical pitfalls: Simpson, causation, bias

Statistics misused is more dangerous than none. Three classic traps:

## 1. Simpson's paradox

A trend that appears in each group can **reverse** when the groups are combined. The famous example is the graduate-admissions analysis at the University of California, Berkeley (Bickel, Hammel & O'Connell, 1975, *Science*): pooled data showed men admitted at a higher rate than women, but within departments there was no comparable evidence of bias, because women applied more to more competitive departments.

The numbers in this lesson are **illustrative**, constructed by Lexi Learn: treatment A is better in both patient groups, yet pooled B looks better because B was given mostly to mild cases.

![Bar charts: A and B recovery rates per group and pooled](/lessons/prob-stats/29-pitfalls-simpson-en.svg)
*A is higher in both groups, but B is higher pooled because B mostly treated mild cases.*

**Lesson:** a *third variable* (here, severity) can change the conclusion. Ask how the data were grouped and why.

## 2. Correlation is not causation

Ice-cream sales and drownings both rise in summer, because both are driven by a **confounder**, hot weather. Establishing causation needs a **randomised controlled experiment** (like an A/B test or clinical trial) or careful causal-inference methods (Pearl, 2009).

## 3. Selection bias and survivorship bias

During World War II Abraham Wald was asked where to add armour on returning aircraft. He pointed out that bullet holes on *surviving* planes show where a hit is survivable; the places with no holes are the fatal ones. Looking only at **survivors** misleads. (A story often retold; historical details may be simplified.)

## References

- Bickel, P. J., Hammel, E. A., O'Connell, J. W. (1975). Sex bias in graduate admissions: data from Berkeley. *Science* 187(4175), 398–404.
- Pearl, J. (2009). *Causality* (2nd ed.). Cambridge University Press.
- Mangel, M. & Samaniego, F. J. (1984). Abraham Wald's work on aircraft survivability. *J. Amer. Statist. Assoc.* 79.
- Diez et al., *OpenIntro Statistics*, chapter 1 (Data collection, observational vs experiment).
