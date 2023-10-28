import { PolymorphicComponentProps } from '@/types/polymorphic';
import { cn } from '@/util/styles';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 font-semibold tracking-tight',
      body: '',
      small: 'text-sm',
      extraSmall: 'text-xs',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export type TypographyProps = {
  asChild?: boolean;
} & VariantProps<typeof typographyVariants>;

const Typography = <C extends React.ElementType>({
  className,
  variant,
  asChild = false,
  as,
  ...props
}: PolymorphicComponentProps<C, TypographyProps>) => {
  const Comp = asChild ? Slot : as ?? 'div';

  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
};
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
