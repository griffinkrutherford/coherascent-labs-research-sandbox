# Hypothesis Tracker

Last updated: April 2, 2026

## Purpose

This document records the active research hypotheses for Coherascent Labs. Each hypothesis is written to be testable, bounded, and connected to a specific research stream in the roadmap.

A hypothesis moves through the following states:

- `Draft`: promising but not yet operationalized.
- `Active`: defined well enough to drive experiment design.
- `Testing`: experiments are underway.
- `Supported`: evidence currently favors the hypothesis.
- `Mixed`: evidence is incomplete or inconsistent.
- `Rejected`: evidence materially counts against the hypothesis.
- `Archived`: no longer on the active roadmap.

## Evidence Standard

A hypothesis should not be marked `Supported` unless:

- the benchmark is explicitly defined,
- the baseline is appropriate,
- the result is reproducible across multiple runs or settings,
- the main failure cases are documented,
- and the improvement is meaningful relative to cost, complexity, or constraints.

## Tracker Fields

Each entry should specify:

- hypothesis ID,
- research stream,
- claim,
- rationale,
- measurable prediction,
- independent and dependent variables,
- experiment design,
- falsification conditions,
- status,
- and next action.

## Active Hypotheses

### H-001: Deterministic control layers reduce contradiction rate in constrained reasoning tasks

Research stream:
Deterministic Architecture

Status:
`Active`

Claim:
Adding a deterministic control layer on top of a probabilistic language model will reduce contradiction rate on structured reasoning tasks compared with unconstrained generation.

Rationale:

- Probabilistic generation often optimizes for plausibility rather than consistency.
- A control layer can explicitly reject or revise outputs that violate declared rules.
- Contradiction rate is a tractable first metric because it is easier to formalize than broad truthfulness.

Measurable prediction:

- On a logic-constrained benchmark, contradiction rate should decrease relative to the same model without the control layer.
- The reduction should remain visible across multiple prompt seeds or decoding settings.

Independent variables:

- presence or absence of control layer,
- type of constraint enforcement,
- decoding policy,
- and task difficulty.

Dependent variables:

- contradiction rate,
- valid-output rate,
- latency overhead,
- and completion rate.

Initial experiment design:

1. Define a synthetic benchmark with explicit logical consistency checks.
2. Run an unconstrained baseline model.
3. Run the same model with a deterministic control layer.
4. Compare contradiction rate and throughput.
5. Label failure modes where the control layer blocks useful answers or introduces degenerate behavior.

Falsification conditions:

- contradiction rate does not improve materially,
- improvement appears only in trivial cases,
- or the control layer causes unacceptable degradation in completion quality or latency.

Key dependencies:

- formal contradiction metric,
- benchmark implementation,
- and a minimal control-layer prototype.

Next action:

- define the benchmark schema and first-pass contradiction checker.

### H-002: Post-generation verification can recover a substantial share of invalid outputs without requiring full deterministic decoding

Research stream:
Deterministic Architecture

Status:
`Draft`

Claim:
A verifier-guided post-processing stage can recover a meaningful portion of invalid outputs at lower implementation cost than a fully integrated deterministic control layer.

Rationale:

- Full constrained decoding may be expensive or brittle.
- Post-hoc verification may provide a simpler path to measurable gains.

Measurable prediction:

- A verifier-and-repair pipeline should outperform the unconstrained baseline on logic adherence while remaining simpler to implement than full constrained generation.

Independent variables:

- verification strategy,
- repair strategy,
- and number of allowed retries.

Dependent variables:

- logic adherence,
- repair success rate,
- latency,
- and failure-mode distribution.

Initial experiment design:

1. Generate unconstrained outputs.
2. Verify them against formal checks.
3. Attempt repair using a bounded retry or revision process.
4. Compare with unconstrained and fully constrained methods.

Falsification conditions:

- repair success is rare,
- the verifier is too weak to detect meaningful violations,
- or the total cost approaches that of stronger control-layer methods without comparable gains.

Key dependencies:

- output verifier,
- repair prompt protocol or repair algorithm,
- and a benchmark with machine-checkable failures.

Next action:

- define what counts as a "repair" rather than a full regeneration.

### H-003: A continuous relaxation of unit propagation can preserve useful logical structure for gradient-based inference

Research stream:
Continuous DPLL

Status:
`Active`

Claim:
At least some elements of DPLL, especially unit-propagation-like behavior, can be relaxed into a differentiable form that preserves enough structure to improve reasoning on clause-based tasks.

Rationale:

- Unit propagation is a local and structured operation.
- Local symbolic updates may be more amenable to continuous approximation than full discrete backtracking.

Measurable prediction:

- A differentiable relaxation of propagation should outperform naive continuous baselines on clause-consistency or satisfiability-inspired tasks.

Independent variables:

- relaxation design,
- temperature or smoothness parameters,
- training regime,
- and clause complexity.

Dependent variables:

- clause satisfaction rate,
- convergence behavior,
- gradient stability,
- and solution quality.

Initial experiment design:

1. Encode small CNF instances into a differentiable representation.
2. Implement a propagation-inspired update mechanism.
3. Compare against simpler continuous baselines with no DPLL-inspired structure.
4. Measure whether the method converges toward satisfying assignments more reliably.

Falsification conditions:

- the relaxation behaves like an unstructured heuristic,
- gradients become too unstable to train or optimize effectively,
- or performance offers no advantage over simpler methods.

Key dependencies:

- CNF task generator,
- differentiable representation of clauses and literals,
- and evaluation metrics for partial and full satisfaction.

Next action:

- formalize a toy setting where unit propagation has a clear continuous analogue.

### H-004: Branching is the hardest DPLL component to relax without losing symbolic value

Research stream:
Continuous DPLL

Status:
`Draft`

Claim:
Among core DPLL operations, branching and backtracking will be significantly harder to relax into continuous form than propagation or local consistency updates.

Rationale:

- Branching introduces combinatorial commitment.
- Backtracking depends on discrete failure structure and search-tree semantics.

Measurable prediction:

- Continuous formulations will preserve local consistency signals more readily than branch-selection semantics on comparable tasks.

Independent variables:

- operation type being relaxed,
- relaxation mechanism,
- and problem size.

Dependent variables:

- interpretability of intermediate states,
- optimization stability,
- and final satisfiability performance.

Initial experiment design:

1. Build separate relaxations for propagation-like updates and branching-like updates.
2. Evaluate each on small structured SAT instances.
3. Compare preservation of symbolic interpretability and downstream performance.

Falsification conditions:

- branching relaxations perform as well as or better than local relaxations while retaining interpretable semantics,
- or the distinction between the operations proves experimentally unimportant.

Key dependencies:

- decomposition of DPLL into independently testable components,
- and a metric for symbolic fidelity.

Next action:

- define "symbolic fidelity" in a measurable way.

### H-005: Curvature-aware optimization reveals latent state structure that first-order methods obscure

Research stream:
Optimization Cognition

Status:
`Active`

Claim:
Second-order or curvature-aware optimization analyses will reveal stable latent structure in cognitive-state models that is less apparent under first-order-only analysis.

Rationale:

- First-order updates can miss coupling between dimensions.
- Hessian structure may expose local geometry tied to stability, ambiguity, or transition regimes.

Measurable prediction:

- Curvature-aware analyses should identify interpretable regimes, bifurcations, or transition patterns that correlate with model behavior better than gradient-only summaries.

Independent variables:

- optimization method,
- curvature approximation method,
- objective design,
- and state-space dimensionality.

Dependent variables:

- convergence stability,
- interpretability of latent structure,
- sensitivity to initialization,
- and explanatory power relative to observed behavior.

Initial experiment design:

1. Construct toy cognitive-state objectives with known or inspectable geometry.
2. Compare first-order trajectories against curvature-aware analyses.
3. Measure whether curvature features predict instability, mode switching, or local minima quality.

Falsification conditions:

- curvature-aware methods provide no additional explanatory value,
- results are too noisy or unstable to interpret,
- or the added complexity does not produce decision-relevant insights.

Key dependencies:

- toy objective family,
- Hessian or Hessian-approximation tooling,
- and a standard for "interpretability" in this setting.

Next action:

- define a small family of test objectives with known geometric properties.

### H-006: Prediction-error minimization alone is insufficient to produce reliable reasoning dynamics

Research stream:
Optimization Cognition

Status:
`Draft`

Claim:
Minimizing prediction error without additional structural priors or constraints will not reliably yield robust reasoning-like dynamics.

Rationale:

- Generic optimization may fit behavior without learning disciplined structure.
- Reasoning stability may require explicit regularization, symbolic priors, or architectural controls.

Measurable prediction:

- Models optimized only for prediction error will exhibit brittle or uninterpretable internal dynamics compared with models that include additional structure.

Independent variables:

- objective definition,
- presence of structural priors,
- and regularization strategy.

Dependent variables:

- stability,
- generalization,
- interpretability,
- and consistency under perturbation.

Initial experiment design:

1. Compare pure prediction-error objectives with structured variants.
2. Evaluate dynamics under perturbation and out-of-distribution conditions.
3. Analyze whether internal trajectories remain stable and interpretable.

Falsification conditions:

- pure prediction-error objectives produce robust and interpretable reasoning dynamics on par with structured approaches.

Key dependencies:

- working definition of reasoning dynamics,
- perturbation protocol,
- and evaluation metrics beyond raw loss.

Next action:

- specify candidate structural priors for the comparison.

### H-007: Hybrid symbolic-neural systems improve verifiability on reasoning-heavy tasks relative to purely neural baselines

Research stream:
Neuro-Symbolic Bridge

Status:
`Active`

Claim:
A hybrid architecture that combines Transformer representations with explicit symbolic checking or state manipulation will improve verifiability on reasoning-heavy tasks relative to a comparable purely neural system.

Rationale:

- Neural systems offer flexibility and scale.
- Symbolic components offer inspectability and formal constraint enforcement.
- A hybrid system may capture the advantages of both where reasoning quality matters more than stylistic fluency alone.

Measurable prediction:

- Hybrid systems should achieve higher verified-correctness rates or lower rule-violation rates than purely neural baselines on tasks with machine-checkable validity.

Independent variables:

- architecture type,
- symbolic interface design,
- and task family.

Dependent variables:

- verified correctness,
- rule-violation rate,
- latency,
- and ablation sensitivity.

Initial experiment design:

1. Choose a reasoning-heavy task with explicit validity checks.
2. Compare a purely neural baseline with one or more hybrid variants.
3. Run ablations on the symbolic component and interface mechanism.

Falsification conditions:

- the hybrid system does not improve verifiability,
- improvements disappear under fair controls,
- or the symbolic component adds complexity without measurable value.

Key dependencies:

- hybrid architecture sketch,
- verifiable task design,
- and a fair baseline definition.

Next action:

- define the first candidate hybrid interface.

### H-008: Interface design, not symbolic capacity alone, is the main bottleneck in neuro-symbolic systems

Research stream:
Neuro-Symbolic Bridge

Status:
`Draft`

Claim:
The primary limitation in neuro-symbolic systems is not the existence of symbolic modules themselves, but the quality of the interface between learned representations and formal structures.

Rationale:

- Symbolic modules can only help if the neural system can produce and consume compatible state representations.
- Poor interfaces can make otherwise powerful symbolic components ineffective.

Measurable prediction:

- Changes to the interface design will explain more performance variance than changes to symbolic rule capacity on matched tasks.

Independent variables:

- interface design,
- symbolic module complexity,
- and training or decoding strategy.

Dependent variables:

- verified correctness,
- data efficiency,
- and failure-mode composition.

Initial experiment design:

1. Hold the symbolic core roughly constant.
2. Vary the handoff between neural and symbolic representations.
3. Compare effect sizes against increasing symbolic rule capacity alone.

Falsification conditions:

- increasing symbolic capacity dominates interface changes,
- or the interface differences do not materially alter outcomes.

Key dependencies:

- at least one stable symbolic core,
- interface variants,
- and a benchmark that stresses representation handoff.

Next action:

- define a minimal symbolic core to keep fixed across interface variants.

## Cross-Cutting Measurement Questions

These questions apply across multiple hypotheses and should be resolved early:

### MQ-001: How will hallucination be measured?

Open issue:

- Hallucination can mean factual fabrication, unsupported synthesis, invalid logical step, or contradiction.
- Early experiments should prefer narrow, machine-checkable definitions before broader claims.

Immediate need:

- define separate labels for contradiction, unverifiable claim, and failed constraint satisfaction.

### MQ-002: What counts as a meaningful improvement?

Open issue:

- Small metric gains may not justify large complexity or latency costs.

Immediate need:

- define minimum effect sizes and acceptable overhead ranges for each research stream.

### MQ-003: What level of reproducibility is required before promoting a hypothesis?

Open issue:

- One successful run is insufficient.

Immediate need:

- define minimum rerun counts, seed policy, and reporting format.

## Experiment Template

Use this template when adding new entries:

```md
### H-XXX: Short hypothesis title

Research stream:

Status:

Claim:

Rationale:

Measurable prediction:

Independent variables:

Dependent variables:

Initial experiment design:

Falsification conditions:

Key dependencies:

Next action:
```

## Promotion Rules

Move a hypothesis:

- from `Draft` to `Active` when the metrics and experiment design are concrete,
- from `Active` to `Testing` when code or notebooks exist and runs have started,
- to `Supported`, `Mixed`, or `Rejected` only after evidence is logged in linked experiment artifacts.

## Immediate Priorities

1. Finalize H-001 benchmark definition and contradiction metric.
2. Formalize the toy setting for H-003.
3. Define the objective family for H-005.
4. Specify a minimal first hybrid interface for H-007.
5. Add cross-links from future experiment folders back to the relevant hypothesis IDs.
