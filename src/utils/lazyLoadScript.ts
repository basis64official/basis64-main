type ScriptOptions = {
  src: string;
  async?: boolean;
  defer?: boolean;
  crossorigin?: string;
};

export function lazyLoadScript({ src, async = true, defer = true, crossorigin }: ScriptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); // script udah ada
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = async;
    script.defer = defer;
    if (crossorigin) script.crossOrigin = crossorigin;

    script.onload = () => resolve();
    script.onerror = (err) => reject(err);

    document.body.appendChild(script);
  });
}
