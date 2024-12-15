/**
 * Type definition for polymorphic component props.
 *
 * @template Element - The element type that the component renders as.
 */
declare type PolymorphicComponentProps<Element extends React.ElementType> =
  Readonly<React.ComponentPropsWithRef<Element>> & {
    readonly as?: Element;
  };
