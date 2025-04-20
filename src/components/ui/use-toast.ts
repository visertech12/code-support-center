
// Instead of importing from our hooks, we need to re-export directly from the hooks directory
// This prevents circular dependencies that could cause hook initialization issues

import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
